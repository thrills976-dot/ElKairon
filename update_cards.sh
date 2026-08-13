#!/bin/bash

# We want the parent background to be completely transparent or very light so the image shows through.
# Let's remove the heavy background colors from the parent container in these components:

# WhyElKairon.tsx
sed -i 's/bg-navy-900\/80/bg-navy-950\/40/g' /app/applet/src/components/home/WhyElKairon.tsx
sed -i 's/opacity-40 group-hover:opacity-60/opacity-30 group-hover:opacity-60/g' /app/applet/src/components/home/WhyElKairon.tsx

# HowItWorks.tsx
sed -i 's/bg-navy-900\/80/bg-navy-950\/40/g' /app/applet/src/components/home/HowItWorks.tsx
sed -i 's/opacity-40 group-hover:opacity-60/opacity-30 group-hover:opacity-60/g' /app/applet/src/components/home/HowItWorks.tsx

# Services.tsx
sed -i 's/bg-navy-950\/90/bg-navy-950\/40/g' /app/applet/src/components/home/Services.tsx
sed -i 's/opacity-40 group-hover:opacity-60/opacity-30 group-hover:opacity-60/g' /app/applet/src/components/home/Services.tsx

# Visas.tsx
sed -i 's/bg-navy-900\/90/bg-navy-950\/40/g' /app/applet/src/components/home/Visas.tsx
sed -i 's/opacity-40 group-hover:opacity-60/opacity-30 group-hover:opacity-60/g' /app/applet/src/components/home/Visas.tsx

# WhyGermany.tsx
sed -i 's/bg-navy-950\/90/bg-navy-950\/40/g' /app/applet/src/components/home/WhyGermany.tsx
sed -i 's/opacity-40 group-hover:opacity-60/opacity-30 group-hover:opacity-60/g' /app/applet/src/components/home/WhyGermany.tsx

# GuaranteedBenefits.tsx
sed -i 's/bg-navy-900\/90/bg-navy-950\/40/g' /app/applet/src/components/home/GuaranteedBenefits.tsx
sed -i 's/opacity-40 group-hover:opacity-60/opacity-30 group-hover:opacity-60/g' /app/applet/src/components/home/GuaranteedBenefits.tsx

