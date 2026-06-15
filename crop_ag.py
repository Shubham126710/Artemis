from PIL import Image

def aggressive_crop(img_path):
    img = Image.open(img_path).convert("RGBA")
    a = img.split()[-1]
    mask = a.point(lambda p: p > 10 and 255)
    bbox = mask.getbbox()
    if bbox:
        img_cropped = img.crop(bbox)
        img_cropped.save(img_path)
        print(f"Aggressively cropped {img_path} to {bbox}")
    else:
        print(f"No bounding box found for {img_path}")

aggressive_crop('public/favicon.png')
aggressive_crop('public/logo.png')
