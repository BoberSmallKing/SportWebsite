from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ('number',)
    list_display = ('number', 'full_name', 'is_approved', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('number', 'full_name')

    # Убираем username
    fieldsets = (
        (None, {'fields': ('number', 'password')}),
        ('Personal info', {'fields': ('full_name', 'bio')}),
        ('Permissions', {'fields': ('is_active', 'is_approved', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('number', 'full_name', 'password1', 'password2'),
        }),
    )

    filter_horizontal = ('groups', 'user_permissions')
