import re
import os

html_file = 'sanskrit-modules.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

styles = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
os.makedirs('src/css', exist_ok=True)
with open('src/css/style.css', 'w', encoding='utf-8') as f:
    for s in styles:
        f.write(s.strip() + '\n\n')

print("Extracted CSS.")
