# Generated by Django 4.2.1 on 2024-02-29 04:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0016_calcdata_po1_calcdata_po2_calcdata_po3_calcdata_po4_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='calcdata',
            name='po6',
        ),
    ]
