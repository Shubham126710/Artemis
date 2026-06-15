from PIL import Image

def crop_transparency(img_path):
    img = Image.open(img_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    bg = Image.new(img.mode, img.size, (0, 0, 0, 0))
    diff = Image.composite(img, bg, img)
    bbox = diff.getbbox()
    if bbox:
        img_cropped = img.crop(bbox)
        img_cropped.save(img_path)
        print(f"Cropped {img_path}")
    else:
        print(f"No bounding box for {img_path}")

try:
    crop_transparency('public/favicon.png')
    crop_transparency('public/logo.png')
except Exception as e:
    print(f"Error: {e}")
