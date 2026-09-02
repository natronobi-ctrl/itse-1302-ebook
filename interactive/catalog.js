const CATALOG = {
  title: "ITSE-1302 Scientific Python",
  subtitle: "An interactive coursebook",
  attribution: "Original courseware by Prof. Richard G. Baldwin, Austin Community College",
  units: [
    {
      id: "start",
      title: "Getting started",
      items: [
        { id: "guide", title: "How to use this ebook", type: "guide" },
        { id: "overview", title: "Overview", src: "Overview.1302.htm", type: "lesson" },
        { id: "building", title: "Building Python from scratch", src: "BuildingPythonFromScratch.htm", type: "lesson" },
        { id: "cli", title: "Command-line arguments", src: "G0103.CommandLineArgs.htm", type: "lesson" },
        { id: "oop", title: "Object-oriented programming", src: "G0102.OOP.htm", type: "lesson" },
        { id: "hist-preview", title: "Histogram plotting preview", src: "Preview01.htm", type: "lesson" },
        { id: "playground", title: "Python playground", type: "playground" }
      ]
    },
    {
      id: "stats",
      title: "Statistical programming",
      items: [
        { id: "stat-preview", title: "Statistical programming in Python", src: "StatPreview01.htm", type: "lesson" },
        { id: "stat-dataset", title: "Definition of a dataset", src: "StatDefDataset01.htm", type: "lesson" },
        { id: "stat-mean", title: "The mean", src: "StatMean01.htm", type: "lesson" },
        { id: "stat-median", title: "The median", src: "StatMedian01.htm", type: "lesson" },
        { id: "stat-mode", title: "The mode", src: "StatMode01.htm", type: "lesson" },
        { id: "lab-dataset", title: "Lab: Dataset studio", type: "lab", lab: "dataset" },
        { id: "stat-stdev", title: "Standard deviation", src: "StatStdev01.htm", type: "lesson" },
        { id: "stat-freq", title: "Frequency distribution charts", src: "StatFreqDist01.htm", type: "lesson" },
        { id: "stat-hist", title: "Histograms", src: "StatHist01.htm", type: "lesson" },
        { id: "lab-hist", title: "Lab: Histogram bins", type: "lab", lab: "histogram" },
        { id: "stat-scatter", title: "Scatter plots", src: "StatScatter01.htm", type: "lesson" },
        { id: "lab-scatter", title: "Lab: Correlation", type: "lab", lab: "scatter" },
        { id: "stat-normal", title: "Standard normal PDF", src: "StatStdNormal01.htm", type: "lesson" },
        { id: "stat-cdf", title: "Cumulative distribution function", src: "StatCDF01.htm", type: "lesson" },
        { id: "lab-normal", title: "Lab: Normal curve & z-score", type: "lab", lab: "normal" },
        { id: "stat-clt", title: "The Central Limit Theorem", src: "StatCLT01.htm", type: "lesson" },
        { id: "lab-clt", title: "Lab: Central Limit Theorem", type: "lab", lab: "clt" },
        { id: "stat-meanmod", title: "Modifying mean and standard deviation", src: "StatMeanMod01.htm", type: "lesson" },
        { id: "stat-iqr", title: "Quartiles, IQR, and outliers", src: "StatQuartilesIQR.htm", type: "lesson" },
        { id: "stat-box", title: "Box and whisker plots", src: "StatBoxWhisker01.htm", type: "lesson" },
        { id: "lab-box", title: "Lab: Box plot", type: "lab", lab: "box" },
        { id: "stat-z", title: "Standardization and the z-score", src: "StatZscore01.htm", type: "lesson" },
        { id: "stat-ex-index", title: "Statistics exercises index", src: "StatisticsExercisesIndex.htm", type: "lesson" },
        { id: "stat-ex-1", title: "Statistics exercises part 1", src: "StatisticsPart01.html", type: "lesson" },
        { id: "stat-ex-2", title: "Statistics exercises part 2", src: "StatisticsPart02.html", type: "lesson" },
        { id: "stat-ex-3", title: "Statistics exercises part 3", src: "StatisticsPart03.html", type: "lesson" },
        { id: "stat-ex-4", title: "Statistics exercises part 4", src: "StatisticsPart04.html", type: "lesson" },
        { id: "quiz-stats", title: "Statistics quiz", type: "quiz", quiz: "statistics" }
      ]
    },
    {
      id: "viz",
      title: "Data visualization",
      items: [
        { id: "viz-main", title: "Matplotlib visualization", src: "Visualization.htm", type: "lesson" },
        { id: "seaborn", title: "Seaborn vs Matplotlib", src: "Seaborn01.htm", type: "lesson" },
        { id: "viz-ex-index", title: "Visualization exercises index", src: "VisualizationExercisesIndex.htm", type: "lesson" },
        { id: "viz-ex-1", title: "Visualization exercises part 1", src: "VisualizationPart01.html", type: "lesson" },
        { id: "viz-ex-2", title: "Visualization exercises part 2", src: "VisualizationPart02.html", type: "lesson" },
        { id: "viz-ex-3", title: "Visualization exercises part 3", src: "VisualizationPart03.html", type: "lesson" },
        { id: "viz-ex-4", title: "Visualization exercises part 4", src: "VisualizationPart04.html", type: "lesson" },
        { id: "viz-ex-5", title: "Visualization exercises part 5", src: "VisualizationPart05.html", type: "lesson" },
        { id: "viz-ex-6", title: "Visualization exercises part 6", src: "VisualizationPart06.html", type: "lesson" },
        { id: "viz-ex-7", title: "Visualization exercises part 7", src: "VisualizationPart07.html", type: "lesson" },
        { id: "quiz-viz", title: "Visualization quiz", type: "quiz", quiz: "visualization" }
      ]
    },
    {
      id: "numpy",
      title: "NumPy",
      items: [
        { id: "numpy-main", title: "Programming with NumPy", src: "Numpy.htm", type: "lesson" },
        { id: "numpy-index", title: "NumPy index", src: "NumpyIndex.htm", type: "lesson" },
        { id: "numpy-arrays", title: "NumPy arrays", src: "NumpyArrays01.html", type: "lesson" },
        { id: "lab-numpy", title: "Lab: Array playground", type: "lab", lab: "numpy" },
        { id: "quiz-numpy", title: "NumPy quiz", type: "quiz", quiz: "numpy" }
      ]
    }
  ]
};

function allItems() {
  return CATALOG.units.flatMap((unit) =>
    unit.items.map((item) => ({ ...item, unitId: unit.id, unitTitle: unit.title }))
  );
}

function findItem(id) {
  return allItems().find((item) => item.id === id);
}

function findItemBySrc(src) {
  const base = (src || "").split("#")[0].split("/").pop();
  return allItems().find((item) => item.src === src || item.src === base);
}

function neighbors(id) {
  const items = allItems();
  const index = items.findIndex((item) => item.id === id);
  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : null
  };
}
