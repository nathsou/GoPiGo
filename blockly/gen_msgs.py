import os, glob

# Use create_messages.py to create .js files from .json files.
cmd = [
    "python",
    os.path.join("i18n", "create_messages.py"),
    "--source_lang_file", os.path.join("msg", "json", "en.json"),
    "--source_synonym_file", os.path.join("msg", "json", "synonyms.json"),
    "--source_constants_file", os.path.join("msg", "json", "constants.json"),
    "--key_file", os.path.join("msg", "json", "keys.json"),
    "--output_dir", os.path.join("msg", "js"),
    "--quiet"]
json_files = glob.glob(os.path.join("msg", "json", "*.json"))
json_files = [file for file in json_files if not
            (file.endswith(("keys.json", "synonyms.json", "qqq.json", "constants.json")))]
cmd.extend(json_files)
os.system(' '.join(cmd))

# Output list of .js files created.
for f in json_files:
    # This assumes the path to the current directory does not contain "json".
    f = f.replace("json", "js")
    if os.path.isfile(f):
        print("SUCCESS: " + f)
    else:
        print("FAILED to create " + f)