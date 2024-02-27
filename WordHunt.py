word = input()
row = int(input())
col = int(input())
mat = [[i for i in input().split(' ')] for j in range(row)]
count = [0]

possible = {
    (0,1)  : [(1,0), (-1,0)],
    (0,-1)  : [(1,0), (-1,0)],
    (1,0)  : [(0,1), (0,-1)],
    (-1,0)  : [(0,1), (0,-1)],
    (1,1)  : [(1,-1), (-1,1)],
    (-1,-1)  : [(1,-1), (-1,1)],
    (1,-1)  : [(1,1), (-1,-1)],
    (-1, 1)  : [(1,1), (-1,-1)]
    }

def recursion(letter, turned, direction, y, x, count, starting):
    if (starting):
        nextx = x + direction[0]
        nexty = y + direction[1]
        if ((0 <= nextx < col) and (0 <= nexty < row)):  
            nLetter = (word[word.index(letter)+1])  
            if (mat[nexty][nextx] == nLetter):
                if (nLetter != word[-1]):
                    recursion(nLetter, False, direction, nexty, nextx, count, False)
                else:
                    count[0] += 1
        return
    elif (turned):
        nextx = x + direction[0]
        nexty = y + direction[1]
        if ((0 <= nextx < col) and (0 <= nexty < row)):  
            nLetter = (word[word.index(letter)+1])  
            if (mat[nexty][nextx] == nLetter):
                if (nLetter != word[-1]):
                    recursion(nLetter, True, direction, nexty, nextx, count, False)
                else:
                    count[0] += 1
        return
    elif (not turned):
        for a, b in possible[direction]:
            nextx = x + a
            nexty = y + b
            if ((0 <= nextx < col) and (0 <= nexty < row)):  
                nLetter = (word[word.index(letter)+1])  
                if (mat[nexty][nextx] == nLetter):
                    if (nLetter != word[-1]):
                        recursion(nLetter, True, (a,b), nexty, nextx, count, False)
                    else:
                        count[0] += 1
        nextx = x + direction[0]
        nexty = y + direction[1]
        if ((0 <= nextx < col) and (0 <= nexty < row)):  
            nLetter = (word[word.index(letter)+1])  
            if (mat[nexty][nextx] == nLetter):
                if (nLetter != word[-1]):
                    recursion(nLetter, False, direction, nexty, nextx, count, False)
                else:
                    count[0] += 1
        return


for i in range(row):
    for j in range(col):
        if (mat[i][j] == word[0]):
            for key in possible.keys():
                recursion(word[0], False, key, i, j, count, True)   

print(count[0])