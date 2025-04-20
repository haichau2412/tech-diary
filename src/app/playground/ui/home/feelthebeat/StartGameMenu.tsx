interface StartGameMenuProps {
  onPlayClick?: () => void;
  onStoreClick?: () => void;
  onSettingClick?: () => void;
  onInventoryClick?: () => void;
}

const StartGameMenu = ({
  onPlayClick,
  onStoreClick,
  onSettingClick,
  onInventoryClick,
}: StartGameMenuProps) => {
  return (
    <div className="startGameMenu">
      <ul className="flex">
        <li>
          <button onClick={onPlayClick} className="gameButton blue">
            Play
          </button>
        </li>
        <li>
          <button onClick={onInventoryClick} className="gameButton orange">
            Inventory
          </button>
        </li>
        <li>
          <button onClick={onStoreClick} className="gameButton red">
            Store
          </button>
        </li>
        <li>
          <button onClick={onSettingClick} className="gameButton green">
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StartGameMenu;
