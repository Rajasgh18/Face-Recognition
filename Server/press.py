from pynput import keyboard
def onPress(key):
    if key == keyboard.Key.esc:
        # Stop listener
        print("esc")
        return False
with keyboard.Listener(on_press=onPress) as listener: 
    listener.join()
