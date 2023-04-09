import { SelectivesContainerComponent } from "../UploadDataComponents/SelectivesContainerComponent";
import { FullDashboardComponent } from "../FullDashboardComponent/FullDashboardComponent";

//    Компонент главной страницы

export const MainPageComponent = () => {
   return (
      <>
         <SelectivesContainerComponent />
         <FullDashboardComponent />
      </>
   );
};
