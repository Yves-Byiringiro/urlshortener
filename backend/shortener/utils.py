import re
import random
import string
import requests
from user_agents import parse

def generate_short_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def is_valid_url(url):
    try:
        regex = re.compile(r'^(https?://)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(/.*)?$')
        return bool(regex.match(url))
    except Exception:
        return False
    
def get_device(request):
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    ua = parse(user_agent)
    return ua.device.family

def get_location(request):
    ip = request.META.get('REMOTE_ADDR')
    if ip == '127.0.0.1':
        ip = '8.8.8.8'
    response = requests.get(f'http://ipinfo.io/{ip}/json')
    location_data = response.json()
    return location_data.get('country', 'Unknown')

def get_ip_address(request):
    return request.META.get('REMOTE_ADDR')