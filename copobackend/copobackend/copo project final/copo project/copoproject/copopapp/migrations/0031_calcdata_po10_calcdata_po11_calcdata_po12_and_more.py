# Generated by Django 4.2.1 on 2024-04-28 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0030_alter_ecoresult_ec01_alter_ecoresult_ec02_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='calcdata',
            name='po10',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='po11',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='po12',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='po6',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='po7',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='po8',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='po9',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
    ]