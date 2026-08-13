#!/bin/bash

FILES=(
  "/app/applet/src/components/home/WhyElKairon.tsx"
  "/app/applet/src/components/home/HowItWorks.tsx"
  "/app/applet/src/components/home/Services.tsx"
  "/app/applet/src/components/home/Visas.tsx"
  "/app/applet/src/components/home/WhyGermany.tsx"
  "/app/applet/src/components/home/GuaranteedBenefits.tsx"
)

for file in "${FILES[@]}"; do
  # Change opacity-30 or opacity-40 to opacity-80, and group-hover:opacity-60 to group-hover:opacity-100
  sed -i -E 's/opacity-[0-9]+/opacity-60/g' "$file"
  sed -i -E 's/group-hover:opacity-[0-9]+/group-hover:opacity-100/g' "$file"
  
  # Remove heavy bg-navy backgrounds from the parent completely if it's there
  sed -i 's/bg-navy-950\/40//g' "$file"
  sed -i 's/bg-navy-900\/90//g' "$file"
  sed -i 's/bg-navy-950\/90//g' "$file"

  # Lighten the gradient overlay dramatically
  sed -i 's/from-navy-950/from-navy-950\/80/g' "$file"
  sed -i 's/via-navy-950\/50/via-navy-950\/20/g' "$file"
  sed -i 's/via-navy-950\/80/via-navy-950\/20/g' "$file"
  sed -i 's/to-navy-950\/40/to-transparent/g' "$file"
done

