# Generated by Django 4.2.1 on 2024-02-29 05:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0017_remove_calcdata_po6'),
    ]

    operations = [
        migrations.RenameField(
            model_name='calcdata',
            old_name='successful_student_ut1',
            new_name='successful_students',
        ),
        migrations.RemoveField(
            model_name='calcdata',
            name='successful_student_ut2',
        ),
    ]