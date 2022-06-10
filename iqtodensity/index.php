<!DOCTYPE html>
<html>
  <head>
    <title>Density comparer</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="./script.js"></script>
    <link href="./style.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <?php include("./functions.php"); ?>
    <h1>Density comparer</h1>
    <div class="mode" id="density-comparer">Density comparer</div>
    <div class="mode" id="iq-to-density">IQ to density converter</div>
    <?php if (isset($_GET["density"])) {
      $density = $_GET["density"];
    } 
    if (isset($_GET["tolerance"])) {
      $tolerance = $_GET["tolerance"];
    }
    if (isset($_GET["iq"])) {
      $iq = $_GET["iq"];
    } ?>
    <div id="dom-data" style="display: none;">
      <span id="mode"><?php if (isset($_GET["mode"])) {
        echo htmlspecialchars($_GET["mode"]);
      } else {
        echo htmlspecialchars("dc");
      } ?></span>
      <span id="density"><?php echo $density ?></span>
      <span id="tolerance"><?php echo $tolerance ?></span>
      <span id="iq"><?php echo $iq ?></span>
    </div>
    <div class="container">
      <div class="form" id="density-comparer-form" style="display: none;">
        <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?> method="get">
          <input class="field" id="density" type="text" name="density" placeholder="Density" value="<?php if (isset($_GET["density"])) {echo $density;} ?>"  /> <span>g/cm<sup>3</sup>, </span>
          <input class="field" id="tolerance" name="tolerance" list="tolerances" placeholder="Tolerance" value="<?php if (isset($_GET["tolerance"])) {echo $tolerance;} ?>" /> <span>%</span>
          <datalist id="tolerances">
            <option value="0"></option>
            <option value="5"></option>
            <option value="10"></option>
            <option value="25"></option>
            <option value="50"></option>
            <option value="100"></option>
          </datalist>
          <br />
          <br />
          <input type="hidden" name="mode" value="dc" />
          <input id="submit" type="submit" />
        </form>
        <?php if (isset($_GET["density"]) && isset($_GET["tolerance"]) && ($_GET["mode"] === "dc")) {
          $results = scanthru($density, $tolerance);
          if ($results["success"] === true) {
            echo "{$results['density']} g/cm<sup>3</sup> is about the same density as {$results['closest']} (within {$results['closeness']}%).";
          } else {
            echo "{$results['density']} g/cm<sup>3</sup> is not within {$results['tolerance']}% of any material within the database.";
          };
        } ?>
      </div>
      <div class="form" id="iq-to-density-form" style="display: none;">
        <form action=<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?> method="get">
          <input class="field" id="iq" type="text" name="iq" placeholder="IQ" value="<?php if (isset($_GET["iq"])) {echo $iq;} ?>" />
          <input class="field" id="tolerance" name="tolerance" list="tolerances" placeholder="Tolerance" value="<?php if (isset($_GET["tolerance"])) {echo $tolerance;} ?>" /> <span>%</span>
          <br />
          <br />
          <input type="hidden" name="mode" value="itd" />
          <input id="submit" type="submit" />
        </form>
        <?php if (isset($_GET["iq"]) && isset($_GET["tolerance"]) && ($_GET["mode"] === "itd")) {
          iqtodensity($iq, $tolerance);
        } ?>
      </div>
    </div>
  </body>
</html>
