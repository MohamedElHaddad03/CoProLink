from django.contrib import admin
from .models import Profile
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

# Register your models here.


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = "Profiles"


class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "password1",
                    "password2",
                    "email",
                    "first_name",
                    "last_name",
                ),
            },
        ),
    )


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Profile)
