import copy
class Solution:
    def minimumEffortPath(self, heights):
        rm = max(max(heights)) - min(min(heights)) + 5
        dp = [[rm for i in range(len(heights[0]))] for j in range(len(heights))]
        ## up
        dp[0][0] = 0
        def dfs(dp,heights,i,j,dir,checked):
            if i < 0 or i >= len(heights) or j <0 or j >=len(heights[0]) or checked[i][j]:
                return
            if i == 0 and j == 0:
                checked[0][0] = True
                dfs(dp,heights,i+1,j,"down",checked)
                dfs(dp,heights,i,j+1,"right",checked)
            else:
            # update(dp,heights,i,j)     
                if dir == "down":
                    if max( dp[i-1][j],abs(heights[i][j] - heights[i-1][j]) ) >= dp[i][j]: # 没必要算下去了
                        return 
                    dp[i][j] = max( dp[i-1][j],abs(heights[i][j] - heights[i-1][j]) )
                if dir == "up":
                    if max( dp[i+1][j],abs(heights[i][j] - heights[i+1][j]) )>= dp[i][j]:
                        return
                    dp[i][j] = max( dp[i+1][j],abs(heights[i][j] - heights[i+1][j]) )
                if dir == "left":
                    if max( dp[i][j+1],abs(heights[i][j] - heights[i][j+1]) ) >= dp[i][j]:
                        return
                    dp[i][j] = max( dp[i][j+1],abs(heights[i][j] - heights[i][j+1]) )
                if dir == "right":
                    if max( dp[i][j-1],abs(heights[i][j] - heights[i][j-1]) ) >= dp[i][j]:
                        return
                    dp[i][j] = max( dp[i][j-1],abs(heights[i][j] - heights[i][j-1]) )
                if i == len(heights) - 1 and j == len(heights[0]) - 1:
                    return  
                checkedcp = copy.deepcopy(checked)
                checkedcp[i][j] = True
                ## 向三个方向更新
                if dir == "down":
                    dfs(dp,heights,i+1,j,"down",checkedcp)
                    # dfs(dp,heights,i-1,j,"up")
                    dfs(dp,heights,i,j+1,"right",checkedcp)
                    dfs(dp,heights,i,j-1,"left",checkedcp)
                elif dir == "up":
                    # dfs(dp,heights,i+1,j,"down")
                    dfs(dp,heights,i-1,j,"up",checkedcp)
                    dfs(dp,heights,i,j+1,"right",checkedcp)
                    dfs(dp,heights,i,j-1,"left",checkedcp)
                elif dir =="right":
                    dfs(dp,heights,i+1,j,"down",checkedcp)
                    dfs(dp,heights,i-1,j,"up",checkedcp)
                    dfs(dp,heights,i,j+1,"right",checkedcp)
                    # dfs(dp,heights,i,j-1,"left")
                elif dir == "left":
                    dfs(dp,heights,i+1,j,"down",checkedcp)
                    dfs(dp,heights,i-1,j,"up",checkedcp)
                    # dfs(dp,heights,i,j+1,"right")
                    dfs(dp,heights,i,j-1,"left",checkedcp)

        checked = [[False for i in range(len(heights[0]))] for j in range(len(heights))] # 免得重复计算
        # checked[0][0] = True
        dfs(dp,heights,0,0,"down",checked)

        return dp[-1][-1]

s= Solution()
print(s.minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]]))