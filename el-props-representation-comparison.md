# #1 `[EL TAG NUM_PROPS NUM_STATIC_PROPS <KEY STATIC INDEX> <DYN VALUE INDEX> <KEY STATIC INDEX> <STATIC VALUE INDEX>]`

## 2 props

    [0 1 2 3 4 5 6 7]

| hello   | sdf            |
| -       | -              |
| NO PROP | 3              |
| PROPS   | 4 + 2N (min 6) |
| 1 PROP  | 6              |
| 2 PROPS | 8              |


# #2 `[EL TAG] [DYNPROP <KEY STATIC INDEX> <DYN VALUE INDEX>] [STATICPROP <KEY STATIC INDEX> <STATIC VALUE INDEX>]`

## 2 props

    [0 1] [2 3 4] [5 6 7]

| NO PROPS | 2              |
| -        | -              |
| PROPS    | 2 + 3N (min 5) |
| 1 PROP   | 5              |
| 2 PROPS  | 8              |


# #3 `[EL TAG NUM_PROPS (NUM_STATIC_PROPS) (KEY_STATIC_START_INDEX) (DYN_VALUE_START_INDEX) (STATIC_VALUE_START_INDEX)]`
// No props
[0 1 2]

## 2 props

    [0 1 2 3 4 5 6]

| NO PROP | 3    |
| -       | -    |
| PROPS   | 6, 7 |
| 1 PROP  | 6, 7 |
| 2 PROPS | 6, 7 |


# #4 `[EL TAG] [DYN_PROP NUM KEY_STATIC_INDEX DYN_VALUE_INDEX] [STATIC_PROP NUM KEY_STATIC_INDEX STATIC_VALUE_INDEX]`

## 2 props

    [0 1] [2 3 4 5] [2 3 4 5]

| NO PROP | 2                      |
| -       | -                      |
| PROPS   | 2 + 4 + 4 = 10 (min 6) |
| 1 PROP  | 6                      |
| 2 PROPS | 6, 10                  |


# #5 `[EL TAG NUM_PROPS (NUM_STATIC_PROPS)]`

**Depends on dynamic/static accumulators**

## 2 props

    [0 1 1]

| NO PROP | 3    |
| -       | -    |
| PROPS   | 3, 4 |
| 1 PROP  | 3, 4 |
| 2 PROPS | 3, 4 |

# #6 `[EL TAG] [DYN_PROP] [STATIC_PROP]`

**Depends on dynamic/static accumulators**

## 2 props

    [0 1] [2] [3]

| NO PROP | 2     |
| -       | -     |
| PROPS   | 2 + N |
| 1 PROP  | 3     |
| 2 PROPS | 4     |
