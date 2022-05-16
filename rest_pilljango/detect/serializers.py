# Serializers define the API representation.
from rest_framework import serializers

from detect.models import Images


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Images
        fields = ['url', 'count']
