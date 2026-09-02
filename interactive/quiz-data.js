const QUIZZES = {
  statistics: {
    title: "Statistics review",
    blurb: "Twenty questions from the original review. Answers stay hidden until you pick one.",
    questions: [
      {
        prompt: "True or False: Positive correlation is a relationship between two variables in which the dependent variable decreases as the independent variable increases.",
        type: "tf",
        answer: "False",
        explain: "That describes a negative correlation. In a positive correlation both variables move in the same direction."
      },
      {
        prompt: "You create a scatter plot and draw a best-fit line that slopes upward from left to right. This indicates:",
        type: "mc",
        choices: ["A. A positive correlation.", "B. A negative correlation.", "C. Neither of the above."],
        answer: "A",
        explain: "An upward-sloping best-fit line is the signature of a positive correlation."
      },
      {
        prompt: "That same upward-sloping best-fit line is an indication of:",
        type: "mc",
        choices: ["A. A positive causation.", "B. A negative causation.", "C. Neither of the above."],
        answer: "C",
        explain: "The plot shows positive correlation. Correlation does not imply causation."
      },
      {
        prompt: "A relative-frequency histogram with five bins reads 0.05, 0.24, 0.4, 0.24, 0.05 from left to right. This is most indicative of:",
        type: "mc",
        choices: ["A. A left-skewed or negatively-skewed distribution.", "B. A normal distribution.", "C. A right-skewed or positively-skewed distribution.", "D. None of the above."],
        answer: "B",
        explain: "The bars peak in the middle and fall off symmetrically — the classic normal shape."
      },
      {
        prompt: "A relative-frequency histogram with five bins reads 0.05, 0.5, 0.4, 0.24, 0.05. This is most indicative of:",
        type: "mc",
        choices: ["A. A left-skewed or negatively-skewed distribution.", "B. A normal distribution.", "C. A right-skewed or positively-skewed distribution.", "D. None of the above."],
        answer: "C",
        explain: "The mass sits left of center with a longer tail to the right: positive / right skew."
      },
      {
        prompt: "A relative-frequency histogram with five bins reads 0.05, 0.24, 0.4, 0.5, 0.05. This is most indicative of:",
        type: "mc",
        choices: ["A. A left-skewed or negatively-skewed distribution.", "B. A normal distribution.", "C. A right-skewed or positively-skewed distribution.", "D. None of the above."],
        answer: "A",
        explain: "The mass sits right of center with a longer tail to the left: negative / left skew."
      },
      {
        prompt: "Which of the following are theoretically true for a normal distribution?",
        type: "mc",
        choices: [
          "A. The mean is greater than the median.",
          "B. The mean and the median are greater than the mode.",
          "C. The median is greater than the mean.",
          "D. The mean and the median are less than the mode.",
          "E. The mean, the median, and the mode are equal.",
          "F. None of the above."
        ],
        answer: "E",
        explain: "For a theoretical normal distribution, mean = median = mode."
      },
      {
        prompt: "Which of the following is true for a right-skewed (positively skewed) distribution?",
        type: "mc",
        choices: [
          "A. The mean is typically greater than the median.",
          "B. The median is typically greater than the mean.",
          "C. The mean, the median, and the mode are equal.",
          "D. None of the above."
        ],
        answer: "A",
        explain: "The long right tail pulls the mean to the right of the median."
      },
      {
        prompt: "Which of the following is true for a left-skewed (negatively skewed) distribution?",
        type: "mc",
        choices: [
          "A. The mean is typically greater than the median.",
          "B. The median is typically greater than the mean.",
          "C. The mean, the median, and the mode are equal.",
          "D. None of the above."
        ],
        answer: "B",
        explain: "The long left tail pulls the mean to the left, so the median is typically larger."
      },
      {
        prompt: "Given a sample from a heavily skewed population, which is probably most representative of the center of the population?",
        type: "mc",
        choices: ["A. The mean of the sample.", "B. The median of the sample.", "C. Neither of the above."],
        answer: "B",
        explain: "The median is resistant to extreme values; the mean is not."
      },
      {
        prompt: "Which most closely approximates the interquartile range (IQR) of a distribution?",
        type: "mc",
        choices: ["A. 25%", "B. 50%", "C. 75%", "D. None of the above."],
        answer: "B",
        explain: "The IQR is Q3 − Q1, the middle two quarters — 50% of the data."
      },
      {
        prompt: "Which of the following are shown by a box-and-whisker plot? Select every item the plot actually displays.",
        type: "multi",
        choices: ["A. center", "B. spread", "C. range", "D. standard deviation", "E. variance"],
        answer: ["A", "B", "C"],
        explain: "A box plot shows center (median), spread (IQR), and range (whiskers). It does not show variance or standard deviation."
      },
      {
        prompt: "Which is a very close approximation of the percentage of a normal distribution within ±1 standard deviation of the mean?",
        type: "mc",
        choices: ["A. 25.5%", "B. 50.5%", "C. 75.5%", "D. 100.5%", "E. None of the above."],
        answer: "E",
        explain: "About 68.27% of a normal distribution lies within one standard deviation of the mean (the 68–95–99.7 rule)."
      },
      {
        prompt: "Which is a very close approximation of the percentage of a normal distribution within ±2 standard deviations of the mean?",
        type: "mc",
        choices: ["A. 17.5%", "B. 34.5%", "C. 68.5%", "D. 95.5%", "E. 110.5%"],
        answer: "D",
        explain: "About 95.45% of a normal distribution lies within two standard deviations of the mean."
      },
      {
        prompt: "True or False: Subtracting the mean from every value in a dataset will change the overall shape of the distribution.",
        type: "tf",
        answer: "False",
        explain: "Subtracting the mean only slides the distribution so it is centered at zero. The shape is unchanged."
      },
      {
        prompt: "True or False: Subtracting the mean from every value and then multiplying every value by a constant will change the standard deviation of the distribution.",
        type: "tf",
        answer: "True",
        explain: "Multiplying by a constant scales the spread. Sample standard deviation uses sqrt[Σ(x − x̄)² / (n − 1)]."
      },
      {
        prompt: "True or False: For a fair six-sided die, the probability of rolling a 6 in one roll is 0.1667 or 16.67%.",
        type: "tf",
        answer: "True",
        explain: "One favorable face out of six: 1/6 ≈ 16.67%."
      },
      {
        prompt: "True or False: For two fair six-sided dice, the probability that a 6 appears on each die in one simultaneous roll is 5.54%.",
        type: "tf",
        answer: "False",
        explain: "Independent events: (1/6) × (1/6) = 1/36 ≈ 2.78%."
      },
      {
        prompt: "True or False: A histogram groups numbers into ranges with bars of different heights, and taller bars mean more data in that range. It gives a visual estimate of the shape and spread of continuous sample data.",
        type: "tf",
        answer: "True",
        explain: "That is the standard definition of a histogram."
      },
      {
        prompt: "True or False: The median of a data set is found by adding all numbers and dividing by how many values there are. The mean is the middle value when the data are ordered. The mode is the number that occurs most often.",
        type: "tf",
        answer: "False",
        explain: "Mean and median were swapped. Mean = sum / n. Median = middle ordered value. Mode = most frequent value."
      }
    ]
  },
  visualization: {
    title: "Visualization review",
    blurb: "Twenty-five true/false questions from the Matplotlib unit.",
    questions: [
      { prompt: "True or False: This course uses a conventional paper textbook.", type: "tf", answer: "False", explain: "The course is built around this free ebook and Jupyter notebooks, not a paper textbook." },
      { prompt: "True or False: This course is structured into three competency units.", type: "tf", answer: "True", explain: "Statistics, visualization, and NumPy." },
      { prompt: "True or False: Data visualization is a key competency for data science and analytics.", type: "tf", answer: "True", explain: "Communicating results with plots is a core data-science skill." },
      { prompt: "True or False: Your grades on assessments in certain free online resources will be integrated into your grade for this course.", type: "tf", answer: "False", explain: "Outside practice resources are supplemental; they do not feed this course's gradebook." },
      { prompt: "True or False: The visualization competency is based primarily on Matplotlib, with support from other libraries in the scientific Python ecosystem.", type: "tf", answer: "True", explain: "Matplotlib is the main plotting library; NumPy, pandas, and Seaborn show up as support." },
      { prompt: "True or False: Documents such as Visualization Exercises Part 1 were prepared using Jupyter Notebook.", type: "tf", answer: "True", explain: "Those HTML pages are exported notebooks." },
      { prompt: "True or False: Students in this course are expected to know how to create Jupyter Notebook documents.", type: "tf", answer: "False", explain: "You need to read and run notebooks, not author the course documents." },
      { prompt: "True or False: Presenting Data Science results in text, tables, graphs, and plots — often combining multiple plots in one figure — is a very important capability.", type: "tf", answer: "True", explain: "Clear multi-plot figures are a recurring skill in the exercises." },
      { prompt: "True or False: A single Matplotlib plot can be very simple, but combining two or more plots in one figure is one of the more complex parts of the library.", type: "tf", answer: "True", explain: "Subplots, shared axes, and layout are where Matplotlib gets intricate." },
      { prompt: "True or False: A Matplotlib Figure object can be thought of as the container for one or more plots or subplots.", type: "tf", answer: "True", explain: "Figure is the outer canvas; Axes are the individual plots." },
      { prompt: "True or False: There is only one way to arrange subplots in a Matplotlib Figure object.", type: "tf", answer: "False", explain: "You can use subplots, subplot2grid, GridSpec, add_axes, and more." },
      { prompt: "True or False: To use Matplotlib effectively you also need some knowledge of NumPy.", type: "tf", answer: "True", explain: "Plot data is almost always NumPy arrays or array-like sequences." },
      { prompt: "True or False: Python does not support keyword arguments.", type: "tf", answer: "False", explain: "Keyword arguments are a core Python feature, and Matplotlib uses them heavily." },
      { prompt: "True or False: When you arrange multiple subplots, it can be pleasing to let them share tick labeling on the x-axis, the y-axis, or both.", type: "tf", answer: "True", explain: "sharex and sharey exist for exactly this." },
      { prompt: "True or False: math.cos expects a list of angles and numpy.cos expects a single angle.", type: "tf", answer: "False", explain: "It is the other way around: math.cos takes one number; numpy.cos is vectorized." },
      { prompt: "True or False: numpy.exp receives an array of input values and returns a single output value.", type: "tf", answer: "False", explain: "numpy.exp is vectorized: it returns an array of corresponding outputs." },
      { prompt: "True or False: Matplotlib supports major and minor tick marks as well as major and minor grid lines.", type: "tf", answer: "True", explain: "See Visualization Exercises Part 3." },
      { prompt: "True or False: Matplotlib supports both log and linear plots.", type: "tf", answer: "True", explain: "set_xscale('log') / set_yscale('log') and the semilog helpers." },
      { prompt: "True or False: Scatter plots show how much one variable is affected by another. The relationship between two variables is called their combined relationship.", type: "tf", answer: "False", explain: "The relationship is called their correlation, not their 'combined relationship'." },
      { prompt: "True or False: The simplest box plot displays the full range (min to max), the likely range of variation (the IQR), and a typical value (the median).", type: "tf", answer: "True", explain: "Whiskers, box, and median line." },
      { prompt: "True or False: The notch in a notched box plot displays a confidence interval around the median, normally based on median ± 1.57 × IQR / sqrt(n).", type: "tf", answer: "True", explain: "That is the usual notch formula." },
      { prompt: "True or False: A violin plot is a hybrid of a box plot and a kernel density plot, which shows peaks in the data.", type: "tf", answer: "True", explain: "The wide parts of a violin are density peaks." },
      { prompt: "True or False: Bar charts are used to display values associated with continuous data.", type: "tf", answer: "False", explain: "Bar charts display values for categorical data. Histograms are for continuous data." },
      { prompt: "True or False: Categorical variables represent types of data which may be divided into groups, such as race, sex, age group, and educational level.", type: "tf", answer: "True", explain: "Those are standard examples of categorical variables." },
      { prompt: "True or False: A pie chart is a circular statistical graphic divided into slices to illustrate numerical proportion.", type: "tf", answer: "True", explain: "Each slice is a category's share of the whole." }
    ]
  },
  numpy: {
    title: "NumPy review",
    blurb: "Twenty-five true/false questions from the NumPy unit.",
    questions: [
      { prompt: "True or False: You will often see a NumPy array referred to as an ndarray, because it is an N-dimensional array.", type: "tf", answer: "True", explain: "ndarray is the core NumPy data structure." },
      { prompt: "True or False: The conventional way to import NumPy is: import numpy as npArray", type: "tf", answer: "False", explain: "The convention is import numpy as np." },
      { prompt: "True or False: This code creates a one-dimensional array and prints it:\nmyArray = np.array([1,2,3])\nprint(myArray)", type: "tf", answer: "True", explain: "np.array on a list yields a 1-D ndarray." },
      { prompt: "True or False: The easiest way to access array elements is with parentheses, as in myArray(2).", type: "tf", answer: "False", explain: "Arrays use square brackets, like lists: myArray[2]." },
      { prompt: "True or False: NumPy arrays are immutable.", type: "tf", answer: "False", explain: "You can change elements in place. Tuples are immutable; ndarrays are not." },
      { prompt: "True or False: All of the elements in a NumPy array must be of the same type.", type: "tf", answer: "True", explain: "A single dtype applies to every element (object arrays aside, which this course does not use)." },
      { prompt: "True or False: This is a valid two-dimensional array:\nmyArray = np.array([['r0-c0','r0-c1','r0-c2'],['r1-c0','r1-c1','r1-c2']])", type: "tf", answer: "True", explain: "A list of equal-length lists becomes a 2-D array." },
      { prompt: "True or False: Just like a list, a NumPy array supports the append method.", type: "tf", answer: "False", explain: "Use np.append (a function that returns a new array). ndarray has no append method." },
      { prompt: "True or False: Adding two NumPy arrays with + concatenates them, like lists.", type: "tf", answer: "False", explain: "+ is element-wise addition, not concatenation. Use np.concatenate." },
      { prompt: "True or False: Multiplying a NumPy array by a scalar multiplies each element by that scalar.", type: "tf", answer: "True", explain: "That is vectorized scalar multiplication." },
      { prompt: "True or False: You can square and take the square root of a NumPy array containing numeric data.", type: "tf", answer: "True", explain: "arr ** 2 and np.sqrt(arr) both work element-wise." },
      { prompt: "True or False: Multi-dimensional arrays of the same size and shape can be multiplied on an element-by-element basis.", type: "tf", answer: "True", explain: "arr1 * arr2 is Hadamard (element-wise) product, not matrix multiply." },
      { prompt: "True or False: np.random.random((5,3)) creates an array with five rows and three columns of random values.", type: "tf", answer: "True", explain: "The shape tuple is (rows, columns)." },
      { prompt: "True or False: np.full((2,3),'hello') creates a 2×3 array where every element is 'hello'.", type: "tf", answer: "True", explain: "np.full fills an array of the given shape with a constant." },
      { prompt: "True or False: np.ones(4,4) creates a matrix-style array with 1. on the diagonal and 0. elsewhere.", type: "tf", answer: "False", explain: "That describes np.eye(4). np.ones((4,4)) fills every cell with 1. Also the shape must be a tuple." },
      { prompt: "True or False: You can access an array using slicing in much the same way you slice a list, extracting a subarray.", type: "tf", answer: "True", explain: "Slicing is the usual way to pull a view of a subarray." },
      { prompt: "True or False: myArray[0:2, 1:3] and np.array(myArray[0:2, 1:3]) always produce the same result.", type: "tf", answer: "False", explain: "The first is typically a view of the original data; wrapping with np.array makes a copy." },
      { prompt: "True or False: This prints the statistical mean of every element:\nmyArray = np.array([[1,2,3],[4,5,6],[7,8,9],[10,11,12]])\nprint(np.median(myArray))", type: "tf", answer: "False", explain: "np.median computes the median, not the mean. Use np.mean." },
      { prompt: "True or False: The sort method of a NumPy array creates a new array and sorts that, leaving the original untouched.", type: "tf", answer: "False", explain: "arr.sort() sorts in place. np.sort(arr) returns a sorted copy." },
      { prompt: "True or False: np.intersect1d finds the intersection of two arrays and returns the sorted unique values in both.", type: "tf", answer: "True", explain: "The result is a one-dimensional sorted array of shared unique values." },
      { prompt: "True or False: np.union1d returns a unique, two-dimensional sorted array of values in either input.", type: "tf", answer: "False", explain: "The result is one-dimensional, not two-dimensional." },
      { prompt: "True or False: np.setdiff1d(ar1, ar2) returns the sorted unique values in ar1 that are not in ar2.", type: "tf", answer: "True", explain: "That is the set difference." },
      { prompt: "True or False: np.setxor1d returns the sorted unique values that are in both input arrays.", type: "tf", answer: "False", explain: "Exclusive-or keeps values that are in only one of the two arrays, not both." },
      { prompt: "True or False: Broadcasting lets you do arithmetic on arrays of different shapes by stretching the smaller array across the larger one, subject to the broadcasting rules.", type: "tf", answer: "True", explain: "That is the official description of broadcasting." },
      { prompt: "True or False: A one-dimensional array can be treated as a vector. The sum of the products of two vectors is called the cross product.", type: "tf", answer: "False", explain: "The sum of pairwise products is the dot product. A cross product is a different operation." }
    ]
  }
};
