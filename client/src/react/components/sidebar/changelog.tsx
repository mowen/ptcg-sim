import { ReactComponent } from "../../../../../CHANGELOG.md";

function Changelog({ show }: { show: boolean }) {
  return show ? (
    <div id="changelog">
      <ReactComponent />
    </div>
  ) : null;
}

export default Changelog;
