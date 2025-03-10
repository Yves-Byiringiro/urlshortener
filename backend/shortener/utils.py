import re
import random
import string


def generate_short_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def is_valid_url(url):
    try:
        regex = re.compile(r'^(https?://)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(/.*)?$')
        return bool(regex.match(url))
    except Exception:
        return False