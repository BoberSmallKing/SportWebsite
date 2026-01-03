from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ('number',)
    # Добавляем новые поля в список отображения
    list_display = ('number', 'full_name', 'is_approved', 'url_main_page', 'is_staff')
    search_fields = ('number', 'full_name', 'author_name')
    
    # Делаем технические поля Telegraph только для чтения, чтобы не сломить интеграцию
    readonly_fields = ('acess_token', 'url_main_page', 'created_at', 'updated_at')

    fieldsets = (
        (None, {'fields': ('number', 'password')}),
        ('Персональная информация', {'fields': ('full_name', 'bio')}),
        ('Интеграция Telegraph', {
            'fields': ('author_name', 'acess_token', 'url_main_page'),
            'description': 'Данные создаются автоматически при регистрации тренера'
        }),
        ('Статусы и Права', {
            'fields': ('is_active', 'is_approved', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Даты', {'fields': ('created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('number', 'full_name', 'password'),
        }),
    )

    filter_horizontal = ('groups', 'user_permissions')

    def url_main_page_link(self, obj):
        if obj.url_main_page:
            from django.utils.html import format_html
            return format_html("<a href='{url}' target='_blank'>{url}</a>", url=obj.url_main_page)
        return "-"
    url_main_page_link.short_description = "Главная страница Telegraph"