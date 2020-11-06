class Solution:
    def sortByBits(self, arr):
        def calOnes(num):
            r = 0
            while num > 0 :
                if num % 2 == 1:
                    r += 1
                num //= 2
            return r
        realr = []        
        onedict = {}
        for n in arr:
            ones = calOnes(n)
            if ones in onedict.keys():
                onedict[ones].append(n)
            else:
                onedict[ones] = [n]
        
        kl = list(onedict.keys())
        kl.sort()

        for key in kl:
            print(onedict[key])
            onedict[kl].sort()
            realr.append(onedict[kl])

        return realr

s = Solution()
s.sortByBits([0,1,2,3,4,5,6,7,8])