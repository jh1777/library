import { Preview, moduleMetadata } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { ClarityModule } from "@clr/angular";
import {
  ClarityIcons,
  angleIcon,
  errorStandardIcon,
  infoStandardIcon,
  successStandardIcon,
  warningStandardIcon,
  ellipsisVerticalIcon,
  ellipsisHorizontalIcon,
  checkIcon,
  timesIcon,
  trashIcon,
  popOutIcon,
  undoIcon,
  copyIcon,
  plusCircleIcon,
  plusIcon
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { BrowserModule } from "@angular/platform-browser";
setCompodocJson(docJson);
ClarityIcons.addIcons(checkIcon, timesIcon, trashIcon, popOutIcon, undoIcon, copyIcon, plusCircleIcon, plusIcon, angleIcon, errorStandardIcon, infoStandardIcon, successStandardIcon, warningStandardIcon, ellipsisVerticalIcon, ellipsisHorizontalIcon);

const preview: Preview = {
  decorators: [
    moduleMetadata({
      imports: [ClarityModule, BrowserModule]
    })
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

