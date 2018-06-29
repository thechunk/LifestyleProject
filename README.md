# Build APK

1. react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug --assets-dest ./android/app/src/main/res/
2. ./gradlew assembleDebug
3. Check .../LifestyleProject/android/app/build/outputs/apk/ for app-debug.apk
