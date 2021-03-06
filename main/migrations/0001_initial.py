# Generated by Django 2.0.1 on 2019-03-05 09:40

from django.db import migrations, models
import django.db.models.deletion
import main.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('picture', models.ImageField(help_text='This will be displayed on the product page', upload_to=main.models.get_image_filename, verbose_name='Picture')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=75)),
                ('product_type', models.CharField(choices=[('Top', 'Top'), ('Bottom', 'Bottom')], max_length=256)),
                ('price', models.PositiveIntegerField(verbose_name='Price (£) ')),
                ('description', models.CharField(max_length=256)),
                ('thumbnail', models.ImageField(help_text='This will be the thumbnail shown to customers', upload_to='main/images/')),
            ],
        ),
        migrations.AddField(
            model_name='image',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Product'),
        ),
    ]
