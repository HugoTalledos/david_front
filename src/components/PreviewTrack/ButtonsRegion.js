import { useState } from "react";

import { Button } from "leita-components-ui";

const ButtonsRegion = ({
  show,
  isRegionSelected = false,
  onActive,
  onRemove,
  onSave,
}) => {
  const [editMode, setEditMode] = useState(false);

  const activeEditMode = () => {
    setEditMode(true);
    onActive();
  }

  const saveRegions = () =>{
    setEditMode(false);
    onSave();
  }

  return (<>
  {
    show
      ? editMode 
        ? (<>
          <Button icon="delete" type='link' disabled={!isRegionSelected} onClick={onRemove} />
          <Button icon="content-save" type='link' onClick={saveRegions} />
        </>)
        :<Button icon="select-drag" type='link' onClick={activeEditMode} />
      : <></>
  }
  </>)
};

export default ButtonsRegion;