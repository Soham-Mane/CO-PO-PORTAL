# Generated by Django 5.0.2 on 2024-04-08 10:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0021_subject_teacher_subjects'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='subjects',
        ),
        migrations.DeleteModel(
            name='Subject',
        ),
    ]
