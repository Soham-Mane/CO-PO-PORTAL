# Generated by Django 4.2.1 on 2023-10-27 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0010_eco1configuration_delete_eco1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='first_name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='last_name',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
