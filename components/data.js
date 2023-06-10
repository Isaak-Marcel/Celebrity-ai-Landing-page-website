

import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  PencilSquareIcon,
  AdjustmentsHorizontalIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/hero.png";
import benefitTwoImg from "../public/img/benefit-one.png";

const benefitOne = {
  title: "Some of our text operations",
  desc: `All of the following operations can be done by highlighting and right-clicking, or using a keyboard shortcut.
  They can all increase productivity massively if used correctly. (You can customize all the keyboard shortcuts.)`,
  image: benefitOneImg,
  bullets: [
    {
      title: "Fix all spelling",
      desc: "Highlight the text and right-click to choose spell fix and fix all of the spelling mistakes at once. (Ctrl+Alt+S)",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Improve Text",
      desc: "Improve your text and fix not only spelling but also grammar, structure and improve vocabulary (Ctrl+Q)",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Replace Best Fit",
      desc: "Allows you to replace something with x and find the best matching word for x. Can be used to find synonyms. (Shift+Ctrl +F) ",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};
// add more detalie around featuees
const benefitTwo = {
  title: "Works on a multitude of websites",
  desc: "The Chrome extension works on websites such as Email, Grammarly, Youtube, FaceBook, Twitter, Wikipedia, and more.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Create a Custom Prompt",
      desc: 'You can create your own custom prompt prefix, for example "summary the text" and then that prompt will be used in conjunction with your selected text.',
      icon: <PencilSquareIcon/>,
    },
    {
      title: "Multiple operations at once",
      desc: "You can make multiple operations at once and write and do other stuff while making them. (They take on average about 10s to execute.)",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Copies Automatically",
      desc: "The Text gets automatically copied to your clipboard.",
      icon: <DocumentDuplicateIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
