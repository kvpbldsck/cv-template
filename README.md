# cv-template

Template for cv website

![CV look on mobile screen](./screenshots/dark_mobile.png "Mobile CV")
![CV look on desktop screen](./screenshots/dark_desktop.png "Desktop CV")

## How to use

You need to do next things:
1. Fill [src/data/person.json](./src/data/person.json) with you data.
2. For all new technologies, services and technologies ensure that there are exist corresponding svg icon in [src/svgs/icons](./src/svgs/icons) folder and mapping in [src/data/icons_mapping.json](./src/data/icons_mapping.json) file.
3. Add [optimize](https://squoosh.app/) your photo and save it in [src/images](./src/images) folder. Files with photo must be names as \<your_name\>_480.jpg for 480x480 pixels file, \<your_name\>_720.jpg for 720x720, \<your_name\>_960.jpg for 960x960 and \<your_name\>_1440.jpg for 1440x1440.
4. Run `npm ci && npm run svgo && npm run start`
5. Open your site in Google Chrome and print page to pdf with *Background graphics* flag set (More options -> background graphics) as src/cv.pdf file
6. Stop `npm run start` command and run `npm run build`

After this steps your cv will be fully prepared and placed in dist folder.

## Todo

1. Provide deploy scripts and nginx configs
