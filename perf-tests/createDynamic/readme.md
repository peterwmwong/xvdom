```sh
./times 'node ifs'    | st --complete
./times 'node switch' | st --complete
./times 'node object' | st --complete
```

## Results

```
        N    min      q1       median   q3       max      sum      mean     stddev   stderr
ifs     200  12.6163  12.9503  14.4629  16.6083  18.7753  2959.84  14.7992  1.79528  0.126945
switch  200  14.7395  15.085   15.8835  18.6569  21.8144  3372.7   16.8635  1.86475  0.131858
object  200  24.6611  25.2269  28.3815  28.7419  32.7843  5476.46  27.3823  1.96761  0.139131
```
