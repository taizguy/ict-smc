import {studyForSlug} from '../data/chartLabRemainingContent';
import {RouteChartStudy} from './market/RouteChartStudy';
import {BreakerStudy} from './market/BreakerStudy';
import {SilverBulletStudy} from './market/SilverBulletStudy';
import {ChartLabHub,ChartLabStudyNavigation} from './market/ChartLabHub';
export interface ChartLabProps {initialScenarioSlug?:string;initialStepSlug?:string;onNavigateUrl?:(url:string)=>void;}
export function ChartLab({initialScenarioSlug}:ChartLabProps){const dedicated=studyForSlug(initialScenarioSlug);return <div className="chartlab-analysis">{dedicated?<RouteChartStudy key={dedicated.slug} study={dedicated}/>:initialScenarioSlug==='eurusd-failed-ob-breaker'?<BreakerStudy/>:initialScenarioSlug==='nq-silver-bullet-short'?<SilverBulletStudy/>:<ChartLabHub/>}{initialScenarioSlug&&<ChartLabStudyNavigation slug={initialScenarioSlug}/>}</div>;}
