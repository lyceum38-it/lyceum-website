from playwright.sync_api import sync_playwright

def take_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        
        # Screenshot index.html
        page.goto("file:///G:/site38/index.html")
        page.wait_for_timeout(1000) # wait for animations
        page.screenshot(path="screenshot_index.png", full_page=False)
        
        # Screenshot admissions.html
        page.goto("file:///G:/site38/pages/admissions.html")
        page.wait_for_timeout(1000) # wait for animations
        page.screenshot(path="screenshot_inner.png", full_page=False)
        
        browser.close()

if __name__ == '__main__':
    take_screenshot()
