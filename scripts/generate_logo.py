import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public", exist_ok=True)
os.makedirs("src/app", exist_ok=True)

# 1. Generate Luxury SVG Logo / Icon
svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fae0ad"/>
      <stop offset="40%" stop-color="#dfb973"/>
      <stop offset="70%" stop-color="#c5a059"/>
      <stop offset="100%" stop-color="#916c27"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#15203b"/>
      <stop offset="50%" stop-color="#0b1329"/>
      <stop offset="100%" stop-color="#060a17"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfb973"/>
      <stop offset="50%" stop-color="#c5a059"/>
      <stop offset="100%" stop-color="#7a5518"/>
    </linearGradient>
  </defs>

  <!-- Base Rounded Badge -->
  <rect x="20" y="20" width="472" height="472" rx="96" fill="url(#bgGrad)"/>
  <rect x="24" y="24" width="464" height="464" rx="92" fill="none" stroke="url(#borderGrad)" stroke-width="8"/>
  <rect x="36" y="36" width="440" height="440" rx="80" fill="none" stroke="#c5a059" stroke-width="1.5" stroke-opacity="0.3"/>

  <!-- Architectural Peak & Monogram P -->
  <g>
    <!-- Roof / Apex Diamond -->
    <path d="M 256 85 L 375 175 L 350 198 L 256 126 L 162 198 L 137 175 Z" fill="url(#goldGrad)"/>
    
    <!-- Vertical Pillar of 'P' -->
    <rect x="175" y="180" width="44" height="230" rx="6" fill="url(#goldGrad)"/>
    
    <!-- Upper Loop of 'P' -->
    <path d="M 215 180 H 315 C 365 180 398 212 398 252 C 398 292 365 324 315 324 H 215 Z" fill="none" stroke="url(#goldGrad)" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Architectural horizontal slats inside Loop -->
    <line x1="222" y1="232" x2="310" y2="232" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round"/>
    <line x1="222" y1="272" x2="310" y2="272" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round"/>
    
    <!-- Ground / Foundation Line -->
    <path d="M 135 410 L 377 410" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>
    <path d="M 175 428 L 337 428" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" stroke-opacity="0.7"/>
  </g>
</svg>
"""

with open("src/app/icon.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

with open("public/logo.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

# 2. Draw 1024x1024 master emblem in PIL for sharp downsampling
SIZE = 1024
master = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(master)

# Draw rounded rectangle background
def draw_rounded_rect(draw, bbox, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

# Gradient background
bg_color = (11, 19, 41, 255) # #0b1329
border_color = (197, 160, 89, 255) # #c5a059
gold_light = (223, 185, 115, 255)
gold_mid = (197, 160, 89, 255)
gold_dark = (163, 130, 66, 255)

draw_rounded_rect(draw, (40, 40, SIZE-40, SIZE-40), radius=192, fill=bg_color, outline=border_color, width=16)
draw_rounded_rect(draw, (72, 72, SIZE-72, SIZE-72), radius=160, fill=None, outline=(197, 160, 89, 80), width=3)

# Architectural Peak
peak_coords = [(512, 170), (750, 350), (700, 396), (512, 252), (324, 396), (274, 350)]
draw.polygon(peak_coords, fill=gold_light)

# Vertical Pillar of 'P'
draw.rounded_rectangle((350, 360, 438, 820), radius=12, fill=gold_mid)

# Upper Loop of 'P'
# Draw thick arc / curve
loop_bbox = (350, 360, 796, 648)
draw.rounded_rectangle((430, 360, 630, 648), radius=80, fill=None, outline=gold_mid, width=80)

# Slats inside
draw.line((444, 464, 620, 464), fill=gold_light, width=16)
draw.line((444, 544, 620, 544), fill=gold_light, width=16)

# Foundation line
draw.line((270, 820, 754, 820), fill=gold_mid, width=24)
draw.line((350, 856, 674, 856), fill=gold_dark, width=10)

# 3. Export multi-size ICO
ico_images = [
    master.resize((16, 16), Image.Resampling.LANCZOS),
    master.resize((32, 32), Image.Resampling.LANCZOS),
    master.resize((48, 48), Image.Resampling.LANCZOS),
    master.resize((64, 64), Image.Resampling.LANCZOS),
]
master.resize((32, 32), Image.Resampling.LANCZOS).save(
    "src/app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
)
master.resize((32, 32), Image.Resampling.LANCZOS).save(
    "public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
)

# 4. Apple Touch Icon & PWA Icons
apple_icon = master.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save("src/app/apple-icon.png")
apple_icon.save("public/apple-touch-icon.png")

icon_512 = master.resize((512, 512), Image.Resampling.LANCZOS)
icon_512.save("public/icon-512.png")

# 5. OpenGraph Card (1200 x 630)
og_card = Image.new("RGB", (1200, 630), (10, 15, 28))
og_draw = ImageDraw.Draw(og_card)

# Decorative background glow
for i in range(120, 0, -10):
    alpha = int((120 - i) * 0.4)
    og_draw.ellipse([600 - i*3, 315 - i*2, 600 + i*3, 315 + i*2], outline=(197, 160, 89, alpha), width=2)

# Paste logo emblem
logo_thumb = master.resize((260, 260), Image.Resampling.LANCZOS)
og_card.paste(logo_thumb, (120, 185), mask=logo_thumb)

# Draw luxury typography
try:
    font_title = ImageFont.truetype("arial.ttf", 68)
    font_sub = ImageFont.truetype("arial.ttf", 32)
    font_desc = ImageFont.truetype("arial.ttf", 26)
except:
    font_title = font_sub = font_desc = ImageFont.load_default()

og_draw.text((430, 205), "PHAM LAND", fill=(255, 255, 255), font=font_title)
og_draw.text((430, 290), "BẤT ĐỘNG SẢN MIỀN TRUNG", fill=(223, 185, 115), font=font_sub)
og_draw.text((430, 345), "Đà Nẵng  •  Quảng Nam  •  Quảng Bình", fill=(200, 210, 225), font=font_desc)
og_draw.text((430, 400), "Pháp lý minh bạch  |  Giá trị đầu tư thực  |  Tư vấn chuyên sâu", fill=(140, 160, 190), font=font_desc)

# Border line
og_draw.line((430, 385, 1080, 385), fill=(197, 160, 89, 120), width=2)
og_draw.rectangle((20, 20, 1180, 610), outline=(197, 160, 89), width=3)

og_card.save("public/og-image.jpg", quality=92)

print("All icons, favicons, logos, and og-image generated successfully!")
