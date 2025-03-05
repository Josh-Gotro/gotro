//  create and export a const called hasDependentsOnFile that returns html with a bunch of copy in it, it should probably have a fragment parent

export const hasDependentsOnFileCopy = (
  <>
    <p>
      Please review your dependents info and click Next the info is correct.{" "}
    </p>
    <p>
      To add, remove, or edit your dependents, please click Manage Dependents
      and make the adjustments before continuing.{" "}
    </p>
    <p>
      Changes may take a few moments to appear. If you don't see the updates,
      please click refresh.
    </p>
    <p>
      Clicking Manage Dependents will open the Dependents Portal in a new tab.
    </p>
  </>
);

export const noDependentsOnFileCopy = (
  <>
    <p>
      If you would like to select Employee and Family plans, you will need to
      enter their information into the dependents portal.{" "}
    </p>
    <p>
      To add your dependents, please click the Manage Dependents button and
      enter their information before continuing.
    </p>
    <p>
      Changes may take a few moments to appear. If you don't see the updates,
      please click refresh.
    </p>
    <p>
      Clicking Manage Dependents will open the Dependents Portal in a new tab.
    </p>
  </>
);
