# Generated by Django 4.2.1 on 2024-02-29 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0013_rename_rounded_percentage_test_calcdata_rounded_percentage_test1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='calcdata',
            name='successful_student',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
