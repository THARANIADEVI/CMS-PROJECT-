from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, generics, status as http_status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import About, Skill, Project, Blog, Experience, Testimonial, Service, Media, Message
from .serializers import (
    AboutSerializer,
    SkillSerializer,
    ProjectSerializer,
    BlogSerializer,
    ExperienceSerializer,
    TestimonialSerializer,
    ServiceSerializer,
    MediaSerializer,
    MessageSerializer,
)
from .permissions import IsPortfolioAdmin


class AboutView(generics.RetrieveUpdateAPIView):
    """Singleton — GET (public) / PUT (admin only)."""

    serializer_class = AboutSerializer
    permission_classes = [IsPortfolioAdmin]

    def get_object(self):
        obj, _ = About.objects.get_or_create(pk=1)
        return obj


class PublishableViewSet(viewsets.ModelViewSet):
    permission_classes = [IsPortfolioAdmin]

    def get_queryset(self):
        qs = self.queryset
        if self.request.user and self.request.user.is_authenticated:
            return qs
        return qs.filter(status="published")


class SkillViewSet(PublishableViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(PublishableViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "slug"


class BlogViewSet(PublishableViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = "slug"


class ExperienceViewSet(PublishableViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class TestimonialViewSet(PublishableViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class ServiceViewSet(PublishableViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class MediaUploadView(generics.CreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsPortfolioAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class MessageListView(generics.ListAPIView):
    """GET /api/messages — admin-only inbox of contact form submissions."""

    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsPortfolioAdmin]


class ContactMessageView(generics.CreateAPIView):
    """POST /api/contact → save message + email admin."""

    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = []  # public

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = serializer.save()

        receiver = getattr(settings, "CONTACT_RECEIVER_EMAIL", None)
        if receiver:
            try:
                send_mail(
                    subject=f"Portfolio contact: {msg.subject or msg.name}",
                    message=f"From: {msg.name} <{msg.email}>\n\n{msg.message}",
                    from_email=settings.EMAIL_HOST_USER or "noreply@portfolio.local",
                    recipient_list=[receiver],
                    fail_silently=True,
                )
            except Exception:
                pass

        return Response(serializer.data, status=http_status.HTTP_201_CREATED)
