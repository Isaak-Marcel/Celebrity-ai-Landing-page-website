import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Some of our text operations",
  desc: `All of the following operations can be done by highlighting and right-clicking, or using a keyboard shortcut.
  They can all increase productivity massively if used correctly. `,
  image: benefitOneImg,
  bullets: [
    {
      title: "Fix all spelling",
      desc: "Highlight the text and right-click to choose spell fix and fix all of the spelling mistakes at once. (ctrl+shift+s)",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Improve Text",
      desc: "Improve your text and fix not only spelling but also grammar, structure and improve vocabulary (ctrl+q)",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Replace Best Fit",
      desc: "Allows you to replace something with x and find the best matching word for x. Can be used to find for example find synonyms. (crl) ",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
