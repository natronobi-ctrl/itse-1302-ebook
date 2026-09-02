import matplotlib.pyplot as plt

#Create a 2x2 figure containing four plots with
#shared x and y tick marks and labels.
fig,ax = plt.subplots(2,2,sharey=True,sharex=True)

#Create and plot histograms for four data sets.
#Create a dataset.
data01=list(range(0,101,5))+list(
    range(10,91,5))+list(
    range(20,81,5))+list(
    range(30,71,5))+list(
    range(40,61,5))

#Plot the dataset
ax[0,0].hist(
         data01,#Data to plot
         bins=50,#Number of bins in the histogram
         normed=True,#Normalize the histogram
         range=(min(data01),#Lower limit of the histogram
         max(data01)));#Upper limit of the histogram
#Apply some cosmetics to the plot
ax[0,0].grid(True)
ax[0,0].set_title('Upper Left')#Title above the histogram
ax[0,0].set_ylabel('Y-Value')#Label on y-axis of histogram

#Create and plot another dataset
data02=list(range(0,101,5))+list(
    range(10,91,5))+list(
    range(20,81,5))+list(
    range(30,71,5))

ax[0,1].hist(data02,
         bins=50,
         normed=True,
         range=(min(data02),
         max(data02)));
ax[0,1].grid(True)
ax[0,1].set_title('Upper Right')

#Create and plot another dataset
data03=list(range(0,101,5))+list(
    range(10,91,5))+list(
    range(20,81,5))
ax[1,0].hist(data03,
         bins=50,
         normed=True,
         range=(min(data03),
         max(data03)));
ax[1,0].grid(True)
ax[1,0].set_title('Lower Left')
ax[1,0].set_xlabel('X-Value')
ax[1,0].set_ylabel('Y-Value')

#Create and plot another dataset
data04=list(range(0,101,5))+list(
    range(10,91,5))
ax[1,1].hist(data04,
         bins=50,
         normed=True,
         range=(min(data04),
         max(data04)));
ax[1,1].grid(True)
ax[1,1].set_title('Lower Right')
ax[1,1].set_xlabel('X-Value')

#Display a title at the top
plt.suptitle('Four Histograms in a Figure')

#Cause the plot to become visible
plt.tightlayout=True
plt.show()