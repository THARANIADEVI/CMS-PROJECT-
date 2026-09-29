from datetime import date
from django.core.management.base import BaseCommand
from cms.models import About, Skill, Project, Experience, Testimonial, Service


class Command(BaseCommand):
    help = "Seed real portfolio content from resume."

    def handle(self, *args, **options):
        About.objects.update_or_create(
            pk=1,
            defaults=dict(
                name="Tharania Devi C",
                title="Final-Year IT Student & Full-Stack Developer",
                bio=(
                    "Final-year IT student and full-stack developer with hands-on experience "
                    "building Python (Flask/FastAPI) and JavaScript/TypeScript (React, Next.js) "
                    "applications, including REST APIs, databases, cloud storage, and AI/LLM "
                    "integrations. Seeking an entry-level Software Developer role to apply strong "
                    "technical and problem-solving skills in a dynamic engineering team."
                ),
                email="tharaniadevi@gmail.com",
                phone="+91 7305480193",
                location="Chennai, India",
                github_url="https://github.com/THARANIADEVI",
            ),
        )

        skills = [
            ("Python", "Programming", 90),
            ("JavaScript/TypeScript", "Programming", 85),
            ("Java (Basics)", "Programming", 60),
            ("HTML5", "Web Development", 85),
            ("CSS3", "Web Development", 85),
            ("React.js", "Web Development", 85),
            ("Next.js", "Web Development", 85),
            ("Flask", "Backend & APIs", 85),
            ("FastAPI", "Backend & APIs", 85),
            ("Node.js", "Backend & APIs", 75),
            ("REST API Design", "Backend & APIs", 85),
            ("JWT Authentication", "Backend & APIs", 80),
            ("SQL", "Database & ORM", 80),
            ("PostgreSQL", "Database & ORM", 80),
            ("SQLite", "Database & ORM", 80),
            ("Prisma", "Database & ORM", 75),
            ("AWS S3", "Cloud & Storage", 70),
            ("Supabase", "Cloud & Storage", 75),
            ("OpenAI", "AI/LLM Integration", 75),
            ("Mistral AI", "AI/LLM Integration", 75),
            ("Groq API", "AI/LLM Integration", 70),
            ("Git", "Tools", 85),
            ("GitHub", "Tools", 85),
            ("Postman", "Tools", 80),
            ("Vitest", "Tools", 70),
        ]
        for i, (name, cat, prof) in enumerate(skills):
            Skill.objects.update_or_create(
                name=name,
                defaults=dict(category=cat, proficiency=prof, status="published", display_order=i),
            )

        projects = [
            dict(
                slug="portfolio-cms",
                title="Portfolio CMS",
                short_description="Custom-built CMS + portfolio site",
                description="A from-scratch CMS: Django REST backend, React admin panel, Next.js frontend.",
                tech_stack="Django, DRF, React, Next.js, PostgreSQL",
                github_url="https://github.com/THARANIADEVI/CMS-PROJECT-",
                featured=False,
                display_order=6,
            ),
            dict(
                slug="insurance-management-platform",
                title="Insurance Management Platform",
                short_description="Full-stack insurance management system with role-based access",
                description=(
                    "Developed a full-stack insurance management system (Python/Flask backend, React "
                    "frontend) for customer, policy, claim, and premium management with role-based "
                    "access for admin, agent, and customer roles. Built REST APIs with JWT "
                    "authentication, OCR-assisted document verification, and PDF/Excel report export; "
                    "deployed backend on Render."
                ),
                tech_stack="Python, Flask, React, JWT, OCR",
                github_url="https://github.com/THARANIADEVI/INSURE-TRACK",
                featured=True,
                display_order=0,
            ),
            dict(
                slug="smart-erp",
                title="Smart ERP",
                short_description="Tally-inspired ERP for accounting, inventory, and GST billing",
                description=(
                    "Built a Tally-inspired ERP system (Python/FastAPI backend) covering "
                    "multi-company accounting, inventory, and GST-compliant billing for small "
                    "businesses. Implemented JWT authentication, role-based access control, and "
                    "automated GST and stock calculations across 8 voucher types."
                ),
                tech_stack="Python, FastAPI, JWT, PostgreSQL",
                github_url="https://github.com/THARANIADEVI/SMART-ERP",
                featured=True,
                display_order=1,
            ),
            dict(
                slug="alphasight-ai",
                title="AlphaSight AI — Stock Analysis Assistant",
                short_description="AI-powered assistant for stock analysis using multiple LLMs",
                description=(
                    "Developed an AI-powered assistant for stock analysis using real-time market "
                    "data, integrating multiple LLMs (Grok, Mistral) for conversational responses "
                    "and complex query handling."
                ),
                tech_stack="Python, Grok, Mistral AI",
                github_url="",
                featured=False,
                display_order=4,
            ),
            dict(
                slug="smartquiz",
                title="SmartQuiz — Quiz Management Platform",
                short_description="Role-based quiz platform for creating and completing assessments",
                description=(
                    "Developed a role-based quiz platform with Admin/Student access for creating, "
                    "assigning, and completing assessments. Implemented student management, "
                    "automated scoring, result tracking, and performance monitoring."
                ),
                tech_stack="Python, React, REST API",
                github_url="https://github.com/THARANIADEVI/SmartQuiz",
                featured=False,
                display_order=5,
            ),
            dict(
                slug="text-tone",
                title="Text-Tone — Text to Speech App",
                short_description="Full-stack text-to-speech app with AI-powered text enhancement",
                description=(
                    "Built a full-stack text-to-speech web app (React frontend, Python/Flask "
                    "backend) that converts text to natural speech via the gTTS API, with JWT "
                    "authentication, per-user speech history, and favorites. Added TXT/PDF/DOCX "
                    "text extraction, Mistral AI-powered text enhancement, Supabase cloud audio "
                    "storage, per-user daily usage limits, and an admin analytics dashboard; "
                    "deployed on Vercel and Render."
                ),
                tech_stack="React, Flask, gTTS, Mistral AI, Supabase",
                github_url="https://github.com/THARANIADEVI/Text-Tone",
                featured=True,
                display_order=2,
            ),
            dict(
                slug="cloudnest",
                title="CloudNest — Cloud Storage Service",
                short_description="Google Drive-style cloud file storage platform",
                description=(
                    "Developed a Google Drive-style cloud file storage platform (Next.js, "
                    "TypeScript, Prisma, PostgreSQL) with JWT authentication, nested folders, "
                    "drag-and-drop uploads, and Owner/Editor/Viewer sharing roles. Implemented "
                    "public shareable links with expiry, trash/restore, starred files, search & "
                    "filters, version history, tags, and storage quotas on S3-compatible storage; "
                    "added rate limiting and unit tests."
                ),
                tech_stack="Next.js, TypeScript, Prisma, PostgreSQL",
                github_url="https://github.com/THARANIADEVI/CloudNest",
                featured=False,
                display_order=3,
            ),
        ]
        for p in projects:
            slug = p.pop("slug")
            Project.objects.update_or_create(slug=slug, defaults={**p, "status": "published"})

        experiences = [
            dict(
                company="Labmentix",
                position="Python Developer Intern",
                description=(
                    "Developed and contributed to multiple Python-based applications. Built "
                    "backend services and REST APIs using Python, FastAPI/Flask with database "
                    "integration. Implemented business logic, CRUD operations, data processing, "
                    "and API integrations for real-world applications."
                ),
                start_date=date(2026, 6, 1),
                end_date=None,
                display_order=0,
            ),
            dict(
                company="8 Queens Pvt Ltd",
                position="AI/ML Intern",
                description=(
                    "Built an image classification model to identify bird species from input "
                    "images. Assisted in developing and implementing simple AI-based solutions "
                    "and tasks."
                ),
                start_date=date(2025, 12, 1),
                end_date=date(2026, 1, 31),
                display_order=1,
            ),
            dict(
                company="8 Queens Pvt Ltd",
                position="UI/UX Intern",
                description=(
                    "Engineered a responsive task management web application using HTML, CSS, "
                    "and JavaScript, improving user task completion efficiency. Designed "
                    "wireframes and layouts; improved usability and overall user experience."
                ),
                start_date=date(2025, 6, 1),
                end_date=date(2025, 7, 31),
                display_order=2,
            ),
            dict(
                company="a2z technologies",
                position="Frontend Development Intern",
                description="Assisted in developing web applications using HTML, CSS, JavaScript.",
                start_date=date(2024, 2, 1),
                end_date=date(2024, 2, 28),
                display_order=3,
            ),
        ]
        for e in experiences:
            Experience.objects.update_or_create(
                company=e["company"],
                position=e["position"],
                defaults={**e, "status": "published"},
            )

        # Old placeholder data from before the resume import - not in the resume, so drop it.
        Testimonial.objects.filter(name="Happy Client").delete()
        Service.objects.filter(title="Web Development").delete()

        self.stdout.write(self.style.SUCCESS("Resume content seeded."))
