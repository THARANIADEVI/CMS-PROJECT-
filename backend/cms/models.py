from django.db import models


class PublishableModel(models.Model):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("published", "Published"),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["display_order", "-created_at"]


class About(models.Model):
    """Singleton profile record — GET/PUT only, no delete/create via API."""

    name = models.CharField(max_length=200, blank=True)
    title = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to="about/", blank=True, null=True)
    resume = models.FileField(upload_to="resume/", blank=True, null=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=200, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "About"

    def __str__(self):
        return self.name or "About"


class Skill(PublishableModel):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True)
    proficiency = models.PositiveSmallIntegerField(default=80)  # 0-100
    icon = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Project(PublishableModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    short_description = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    tech_stack = models.CharField(max_length=500, blank=True, help_text="Comma-separated")
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Blog(PublishableModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    excerpt = models.CharField(max_length=300, blank=True)
    content = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="blogs/", blank=True, null=True)
    published_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title


class Experience(PublishableModel):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)  # null = current
    company_logo = models.ImageField(upload_to="experience/", blank=True, null=True)

    def __str__(self):
        return f"{self.position} @ {self.company}"


class Testimonial(PublishableModel):
    name = models.CharField(max_length=200)
    role_company = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    avatar = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    rating = models.PositiveSmallIntegerField(default=5)

    def __str__(self):
        return self.name


class Service(PublishableModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.title


class Media(models.Model):
    file = models.FileField(upload_to="uploads/%Y/%m/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(
        "auth.User", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return self.file.name


class Message(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}>"
