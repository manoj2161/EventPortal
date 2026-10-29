import { useState } from "react";
import { Header } from "./Header";
import { ProfileDetailsCard } from "./ProfileDetailsCard";
import { ProfileDetailsSection } from "./ProfileDetailsSection";
import { ProfileEditModel } from "./ProfileEditModel";

export const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [isOrganiser, setIsOrganiser] = useState(true);
  return (
    <>
      <Header isOrganiser={isOrganiser} />
      <div className="relative">
        <ProfileDetailsSection
          isOrganiser={isOrganiser}
          visible={visible}
          setVisible={setVisible}
        />
        <ProfileDetailsCard isOrganiser={isOrganiser} />
        <div className="absolute top-0 z-100">
          <ProfileEditModel isOrganiser={isOrganiser} visible={visible} />
        </div>
      </div>
    </>
  );
};
