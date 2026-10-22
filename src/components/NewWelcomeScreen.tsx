import { LearningFirstHome } from './LearningFirstHome';
import type { MainTabType } from './Header';
export function WelcomeScreen(_props:{onEnterAcademy:(targetTab?:MainTabType)=>void;onOpenMentorSpotlight:()=>void}){return <LearningFirstHome/>;}
