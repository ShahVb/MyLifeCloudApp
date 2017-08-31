import { TodayPage } from './today/today';
import { WordCloudPage } from './WordCloud/WordCloud';
import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage} from './welcome/welcome';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TabsPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = TodayPage;
export const Tab2Root = WordCloudPage;
export const Tab3Root = SettingsPage;
