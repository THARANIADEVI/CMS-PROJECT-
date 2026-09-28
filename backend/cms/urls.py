from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

router = DefaultRouter()
router.register("skills", views.SkillViewSet, basename="skill")
router.register("projects", views.ProjectViewSet, basename="project")
router.register("blogs", views.BlogViewSet, basename="blog")
router.register("experience", views.ExperienceViewSet, basename="experience")
router.register("testimonials", views.TestimonialViewSet, basename="testimonial")
router.register("services", views.ServiceViewSet, basename="service")

urlpatterns = [
    path("auth/login", TokenObtainPairView.as_view(), name="auth-login"),
    path("auth/refresh", TokenRefreshView.as_view(), name="auth-refresh"),
    path("about", views.AboutView.as_view(), name="about"),
    path("upload/image", views.MediaUploadView.as_view(), name="upload-image"),
    path("contact", views.ContactMessageView.as_view(), name="contact"),
    path("messages", views.MessageListView.as_view(), name="messages"),
    path("", include(router.urls)),
]
