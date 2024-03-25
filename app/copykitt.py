from typing import List
from openai import OpenAI
import os
import argparse
import re

MAX_INPUT_LENGTH = 12

def main():
  print("Running Copy Kitt")

  parser = argparse.ArgumentParser()
  parser.add_argument("--input", "-i", type=str, required=True)
  args = parser.parse_args()
  user_input = args.input
  
  print(f"User input: {user_input}")

  if validate_length(user_input):
    generate_branding_snippet(user_input)
    generate_keywords(user_input)

  else:
     raise ValueError(
        f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Sumitted input is {user_input}"
     )


def validate_length(prompt: str) -> bool:
   return len(prompt) <= MAX_INPUT_LENGTH

def generate_branding_snippet(prompt: str):
  client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

  enriched_prompt = f"Generate unbeat branding snippet for {prompt}"
  print(enriched_prompt)

  response = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
      {"role": "user", "content": enriched_prompt},
    ],
    max_tokens=16
  )

  # Extract output txt
  branding_text: str = response.choices[0].message.content

  # Strip whitespaces
  branding_text = branding_text.strip()

  # Add ... to truncated statements
  last_char = branding_text[-1]
  if last_char not in {".", "!", "?"}:
    branding_text += "..."

  print(f"Snippet: {branding_text}")
  return branding_text
  

def generate_keywords(prompt: str) -> List[str]:
  client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

  enriched_prompt = f"Generate related branding keywords for {prompt}"
  print(enriched_prompt)

  response = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
      {"role": "user", "content": enriched_prompt},
    ],
    max_tokens=16
  )

  # Extract output text
  keywords_text: str = response.choices[0].message.content

  # Strip whitespaces
  keywords_text = keywords_text.strip()
  keywords_array = re.split(",|\n|;|-", keywords_text)
  keywords_array = [k.strip() for k in keywords_array]
  keywords_array = [k for k in keywords_array if len(k) > 0]

  print(f"Keywords: {keywords_array}")
  return keywords_array

if __name__ == "__main__":
    main()