from datetime import date
from django.core.management.base import BaseCommand
from cms.models import About, Skill, Project, Blog, Experience, Testimonial, Service


class Command(BaseCommand):
    help = "Seed demo content so the portfolio has something to render."

    def handle(self, *args, **options):
        About.objects.update_or_create(
            pk=1,
            defaults=dict(
                name="Your Name",
                title="Full-Stack Developer",
                bio="I build web apps with Python, Django and React.",
                email="you@example.com",
                location="Earth",
                github_url="https://github.com/yourname",
                linkedin_url="https://linkedin.com/in/yourname",
            ),
        )

        skills = [
            ("Python", "Backend", 90),
            ("Django", "Backend", 85),
            ("React", "Frontend", 80),
            ("PostgreSQL", "Database", 75),
            ("Tailwind CSS", "Frontend", 80),
        ]
        for i, (name, cat, prof) in enumerate(skills):
            Skill.objects.update_or_create(
                name=name,
                defaults=dict(category=cat, proficiency=prof, status="published", display_order=i),
            )

        Project.objects.update_or_create(
            slug="portfolio-cms",
            defaults=dict(
                title="Portfolio CMS",
                short_description="Custom-built CMS + portfolio site",
                description="A from-scratch CMS: Django REST backend, React admin panel, Next.js frontend.",
                tech_stack="Django, DRF, React, Next.js, PostgreSQL",
                featured=True,
                status="published",
                display_order=0,
            ),
        )

        Service.objects.update_or_create(
            title="Web Development",
            defaults=dict(description="Full-stack web apps end to end.", status="published", display_order=0),
        )

        Experience.objects.update_or_create(
            company="Freelance",
            position="Full-Stack Developer",
            defaults=dict(
                description="Building custom web apps for clients.",
                start_date=date(2023, 1, 1),
                status="published",
                display_order=0,
            ),
        )

        Testimonial.objects.update_or_create(
            name="Happy Client",
            defaults=dict(
                role_company="CEO, Example Co.",
                message="Great work, delivered on time.",
                rating=5,
                status="published",
                display_order=0,
            ),
        )

        Blog.objects.update_or_create(
            slug="hello-world",
            defaults=dict(
                title="Hello World",
                excerpt="First post on my new portfolio blog.",
                content="This is my first blog post, built with a custom CMS.",
                status="published",
            ),
        )

        self.stdout.write(self.style.SUCCESS("Demo content seeded."))
