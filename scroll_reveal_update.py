from pathlib import Path
import re

root = Path('src/pages')
updated = []
for path in sorted(root.glob('*.tsx')):
    text = path.read_text(encoding='utf-8')
    original = text

    # Add data-scroll-reveal to section tags without it
    text = re.sub(r'<section((?![^>]*data-scroll-reveal)[^>]*?)>', r'<section data-scroll-reveal\1>', text)

    # Add loading="lazy" to img tags without loading attr
    def add_img_lazy(match):
        attrs = match.group(1)
        if 'loading=' in attrs:
            return '<img' + attrs + '>'
        return '<img loading="lazy"' + attrs + '>'

    text = re.sub(r'<img((?:\s+[^>]*?)?)>', add_img_lazy, text)

    # Add lazy loading to iframes without loading attr
    def add_iframe_lazy(match):
        attrs = match.group(1)
        if 'loading=' in attrs:
            return '<iframe' + attrs + '>'
        return '<iframe loading="lazy"' + attrs + '>'

    text = re.sub(r'<iframe((?:\s+[^>]*?)?)>', add_iframe_lazy, text)

    if text != original:
        path.write_text(text, encoding='utf-8')
        updated.append(path.name)

print('updated', len(updated), updated)
