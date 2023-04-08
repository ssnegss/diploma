import { SelectivesContainerComponent } from "../UploadDataComponents/SelectivesContainerComponent";
import { DashboardComponent } from "../DashboardComponent/DashboardComponent";

//    Компонент главной страницы

export const MainPageComponent = () => {
   return (
      <>
         <SelectivesContainerComponent />
         <DashboardComponent />
      </>
   );
};
