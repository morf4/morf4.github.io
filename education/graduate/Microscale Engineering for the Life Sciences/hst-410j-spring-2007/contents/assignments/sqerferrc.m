function sqrerr = sqerferrc(params,data)

p = double(params);
x = [0:1:size(data,2)-1];
y = (erfc((x-p(1))/p(2)))*p(3)+p(4);
sqrerr = sum((double(data)-y).^2);
